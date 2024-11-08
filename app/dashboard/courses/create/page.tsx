import Form from './create-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create course',
};

export default async function Page() {
  return (
    <Form />
  );
}
