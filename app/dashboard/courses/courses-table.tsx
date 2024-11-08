import { config } from "@/app//lib/appConfig";
import { CourseStatus } from './course-status';
import { fetchFilteredCourses } from '@/app/lib/course-actions';
import { UpdateCourseButton, DeleteCourseButton } from './buttons';

export async function CoursesTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const courses = await fetchFilteredCourses(query, currentPage);
    return (
        <div>
            <div className={`box is-hidden-mobile ${!config.USE_SHADOWS ? 'is-shadowless' : ''}`}>
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Course Title</th>
                            <th>Code</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses?.map((course) => (
                            <tr key={course.id}>
                                <td>{course.title}</td>
                                <td>{course.code}</td>
                                <td>
                                    <CourseStatus status={course.status} />
                                </td>
                                <td>
                                    <UpdateCourseButton id={course.id} />
                                </td>
                                <td>
                                    <DeleteCourseButton id={course.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {courses?.map((course) => (
                <div key={course.id} className='card is-hidden-tablet'>
                    <div className='card-content'>
                        <div className='is-flex is-flex-direction-column'>
                            <p>{course.title}</p>
                            <p>{course.code}</p>
                        </div>
                        <div className='is-flex is-flex-direction-column is-align-items-end'>
                            <CourseStatus status={course.status} />
                        </div>
                    </div>
                    <footer className="card-footer">
                        <div className="card-footer-item">
                            <UpdateCourseButton id={course.id} />
                        </div>
                        <div className="card-footer-item">
                            <DeleteCourseButton id={course.id} />
                        </div>
                    </footer>
                </div>
            ))}
        </div>
    );
}