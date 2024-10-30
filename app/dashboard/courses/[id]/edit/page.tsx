import Form from '@/app/dashboard/courses/_components/edit-form';
import Breadcrumbs from '@/app/dashboard/courses/_components/breadcrumbs';
import { fetchCourseById } from '@/app/lib/data';
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
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'courses', href: '/dashboard/courses' },
          {
            label: 'Edit course',
            href: `/dashboard/courses/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form course={course} />
    </main>
  );
}
