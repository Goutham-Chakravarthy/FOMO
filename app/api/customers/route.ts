import { NextRequest, NextResponse } from 'next/server';
import { getCustomersCollection } from '@/lib/mongodb';
import { customerFormSchema, customerSchemaForDB } from '@/lib/validation';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    try {
      const validatedData = customerFormSchema.parse(body);

      const customersCollection = await getCustomersCollection();

      const customerDocument = {
        ...validatedData,
        status: 'new' as const,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await customersCollection.insertOne(customerDocument);

      return NextResponse.json(
        {
          success: true,
          message: 'Customer inquiry submitted successfully',
          customerId: result.insertedId.toString()
        },
        { status: 201 }
      );
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        const fieldErrors = validationError.issues.reduce((acc: Record<string, string>, error) => {
          acc[error.path.join('.')] = error.message;
          return acc;
        }, {} as Record<string, string>);

        return NextResponse.json(
          {
            success: false,
            message: 'Validation failed',
            errors: fieldErrors
          },
          { status: 400 }
        );
      }
      throw validationError;
    }
  } catch (error) {
    console.error('Error creating customer:', error);

    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED') || error.message.includes('ENOTFOUND')) {
        return NextResponse.json(
          {
            success: false,
            message: 'Database connection error. Please try again later.'
          },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error. Please try again later.'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const apiKey = process.env.ADMIN_API_KEY;

    if (!apiKey) {
      console.error('ADMIN_API_KEY environment variable not set');
      return NextResponse.json(
        {
          success: false,
          message: 'Server configuration error'
        },
        { status: 500 }
      );
    }

    if (authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized access'
        },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const projectType = searchParams.get('projectType');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const customersCollection = await getCustomersCollection();

    const query: Record<string, any> = {};
    if (status) {
      query.status = status;
    }
    if (projectType) {
      query.projectType = projectType;
    }

    const customers = await customersCollection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .toArray();

    const totalCount = await customersCollection.countDocuments(query);

    const formattedCustomers = customers.map(customer => ({
      id: customer._id.toString(),
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      company: customer.company || null,
      projectType: customer.projectType,
      projectDetails: customer.projectDetails,
      status: customer.status,
      createdAt: customer.createdAt.toISOString(),
      updatedAt: customer.updatedAt.toISOString()
    }));

    return NextResponse.json(
      {
        success: true,
        customers: formattedCustomers,
        pagination: {
          total: totalCount,
          limit,
          offset,
          hasMore: offset + limit < totalCount
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching customers:', error);

    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED') || error.message.includes('ENOTFOUND')) {
        return NextResponse.json(
          {
            success: false,
            message: 'Database connection error. Please try again later.'
          },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error. Please try again later.'
      },
      { status: 500 }
    );
  }
}