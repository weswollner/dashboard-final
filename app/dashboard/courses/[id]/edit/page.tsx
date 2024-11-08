import EditCourseForm from './edit-form'
import { fetchCourseById } from '@/app/lib/course-actions';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit course',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [course] = await Promise.all([
    fetchCourseById(id)
  ]);

  if (!course) {
    notFound();
  }

  return (
    <EditCourseForm course={course} />
  );
}
