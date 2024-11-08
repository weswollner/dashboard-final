export function CourseStatus({ status }: { status: string }) {
  return (
    <>
      {status === 'inactive' ? (
        <span className="tag is-light is-rounded">Inactive</span>
      ) :
        <span className="tag is-success is-rounded">Active</span>
      }
    </>
  );
}