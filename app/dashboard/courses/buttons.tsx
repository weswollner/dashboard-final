import Link from 'next/link';
import { deleteCourse } from '@/app/lib/course-actions';

export function CreateCourseButton() {
  return (
    <Link
      href="/dashboard/courses/create"
    >
      <button className="button" type="submit" value="Create Course">
        <span className="icon">
          <i className="fab fa-plus"></i>
        </span>
        <span>Create Course</span>
      </button>
    </Link>
  );
}

export function UpdateCourseButton({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/courses/${id}/edit`}
    >
      <button className="button">
        <span className="icon">
          <i className="fas fa-pen-to-square"></i>
        </span>
      </button>
    </Link>
  );
}

export function DeleteCourseButton({ id }: { id: string }) {
  const deleteCourseWithId = deleteCourse.bind(null, id);

  return (
    <form action={deleteCourseWithId}>
      <button className="button" type="submit">
        <span className="icon">
          <i className="fas fa-trash-can"></i>
        </span>
      </button>
    </form>
  );
}
