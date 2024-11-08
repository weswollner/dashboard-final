import { config } from "@/app/lib/appConfig";
export default async function Page() {
  return (
    <div className={`box mt-6 ${!config.USE_SHADOWS ? 'is-shadowless' : ''}`}>
      <p className="title is-4">Dashboard</p>
      <div className="grid">
        <div className="card">
          <div className="card-content">
            <div className="content">
              Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec
              id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus
              et magnis dis parturient montes, nascetur ridiculus mus. Cras mattis
              consectetur purus sit amet fermentum.
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="content">
              Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec
              id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus
              et magnis dis parturient montes, nascetur ridiculus mus. Cras mattis
              consectetur purus sit amet fermentum.
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="content">
              Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec
              id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus
              et magnis dis parturient montes, nascetur ridiculus mus. Cras mattis
              consectetur purus sit amet fermentum.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}