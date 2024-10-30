import { CoursesTableSkeleton } from '@/app/ui/skeletons';
export default function Loading() {
  return (
    <div className="w-full">
      <h1 className={`mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <CoursesTableSkeleton />
    </div>
  );
}