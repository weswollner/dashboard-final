import Search from '@/app/ui/search';
import { config } from "@/app//lib/appConfig";
import { Metadata } from 'next';
import Pagination from './pagination';
import { fetchCoursesPages } from '@/app/lib/course-actions';
import { CoursesTable } from './courses-table';
import { CreateCourseButton } from './buttons';

export const metadata: Metadata = {
    title: 'Courses',
};

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchCoursesPages(query);
    return (
        <div className={`box mt-6 ${!config.USE_SHADOWS ? 'is-shadowless' : ''}`}>
            <p className="title is-4">Courses</p>
            <div className="field is-grouped">
                <Search placeholder="Search courses..." />
                <CreateCourseButton />
            </div>
            <CoursesTable query={query} currentPage={currentPage} />
            <Pagination totalPages={totalPages} />
        </div>
    );
}
