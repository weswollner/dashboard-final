'use client';
import Link from 'next/link';
import { useActionState, useState } from 'react';
import { config } from "@/app//lib/appConfig";
import { createCourse } from '@/app/lib/course-actions';
import { CourseState } from '@/app/lib/definitions';

export default function Form() {
  const initialState: CourseState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCourse, initialState);
  const [isActive, setIsActive] = useState(true);

  return (
    <form action={formAction}>
      <div className={`box mt-6 ${!config.USE_SHADOWS ? 'is-shadowless' : ''}`}>
        <p className="title is-4">Create Course</p>
        <div className="field">
          <label className="label">Course Title</label>
          <div className="control has-icons-left">
            <input id="title" name="title" className="input" type="text" placeholder="Enter course title" />
            <span className="icon is-small is-left">
              <i className="fas fa-file-lines"></i>
            </span>
          </div>

          <div id="course-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="has-text-danger" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="field">
          <label className="label">Course Code</label>
          <div className="control has-icons-left">
            <input id="code" name="code" className="input" type="text" placeholder="Enter course code" />
            <span className="icon is-small is-left">
              <i className="fas fa-file-lines"></i>
            </span>
            <div id="code-error" aria-live="polite" aria-atomic="true">
              {state.errors?.code &&
                state.errors.code.map((error: string) => (
                  <p className="has-text-danger" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Course Status</label>
          <div className="buttons has-addons">
            <div className={`button is-small is-rounded ${isActive ? 'is-selected is-success' : ''}`} onClick={() => setIsActive(true)}>Active</div>
            <div className={`button is-small is-rounded ${!isActive ? 'is-selected is-light' : ''}`} onClick={() => setIsActive(false)}>Inactive</div>
          </div>
          <input type="hidden" name="status" value={isActive ? 'active' : 'inactive'} />
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="has-text-danger" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="has-text-danger">{state.message}</p>
          ) : null}
        </div>
        <div className="field is-grouped">
          <Link
            href="/dashboard/courses"
            className="button"
          >
            Cancel
          </Link>
          <button className="button is-link" type="submit">Create Course</button>
        </div>
      </div>
    </form>
  );
}
