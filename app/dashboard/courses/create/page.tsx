import Form from '@/app/dashboard/courses/_components/create-form';
import Breadcrumbs from '@/app/dashboard/courses/_components/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create course',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'courses', href: '/dashboard/courses' },
          {
            label: 'Create Course',
            href: '/dashboard/courses/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
