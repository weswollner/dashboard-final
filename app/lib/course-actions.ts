'use server';
import { sql } from '@vercel/postgres';
import { config } from "@/app//lib/appConfig";
import { z } from 'zod';
import { Course, CourseState } from '@/app/lib/definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const ITEMS_PER_PAGE = config.PAGE_SIZE;

export async function fetchFilteredCourses(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const courses = await sql<Course>`
      SELECT
        courses.id,
        courses.title,
        courses.code,
        courses.status
      FROM courses
      WHERE
        courses.title ILIKE ${`%${query}%`} OR
        courses.code ILIKE ${`%${query}%`} OR
        courses.status ILIKE ${`%${query}%`}
    ORDER BY courses.code DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return courses.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch courses.');
  }
}

export async function fetchCourseById(id: string) {
  try {
    const data = await sql<Course>`
      SELECT
        courses.id,
        courses.title,
        courses.code,
        courses.status
      FROM courses
      WHERE courses.id = ${id};
    `;

    const course = data.rows.map((course) => ({
      ...course,
    }));
    return course[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch course.');
  }
}

export async function fetchCoursesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM courses
    WHERE
      courses.title ILIKE ${`%${query}%`} OR
      courses.code ILIKE ${`%${query}%`} OR
      courses.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of courses.');
  }
}

const CourseSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(1, { message: 'A course title is required.' }),
  code: z.string().trim().min(1, { message: 'A course code is required.' }),
  status: z.enum(['active', 'inactive'], {
    required_error: 'Please select a course status.',
    invalid_type_error: 'Please select a course status.',
  })
});

const CreateCourse = CourseSchema.omit({ id: true });
const UpdateCourse = CourseSchema.omit({ id: true });

export async function createCourse(prevState: CourseState, formData: FormData) {
  const validatedFields = CreateCourse.safeParse({
    title: formData.get('title'),
    code: formData.get('code'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Course.',
    };
  }

  const { title, code, status } = validatedFields.data;

  try {
    await sql`
      INSERT INTO courses (title, code, status)
      VALUES (${title}, ${code}, ${status})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Course.',
    };
  }

  revalidatePath('/dashboard/courses');
  redirect('/dashboard/courses');
}

export async function updateCourse(
  id: string,
  prevState: CourseState,
  formData: FormData,
) {
  const validatedFields = UpdateCourse.safeParse({
    title: formData.get('title'),
    code: formData.get('code'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Course.',
    };
  }

  const { title, code, status } = validatedFields.data;

  try {
    await sql`
      UPDATE courses
      SET title = ${title}, code = ${code}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Course.' };
  }

  revalidatePath('/dashboard/courses');
  redirect('/dashboard/courses');
}

export async function deleteCourse(id: string) {
  try {
    await sql`DELETE FROM courses WHERE id = ${id}`;
    revalidatePath('/dashboard/courses');
    return { message: 'Deleted Course' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Course.' };
  }
}