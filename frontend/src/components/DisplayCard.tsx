import type { Application } from "./../types/applications";
const DisplayCard = ({ application }: { application: Application }) => {

  return (
    <div className="border p-4 rounded shadow-md mb-4"> 
      <p>
       Company: {application.company}
      </p>
      <p>
       Position: {application.position}
      </p>
      <p>
       Location: {application.location}
      </p>
      <p>
       Status: {application.status}
      </p>
      <p>
       Date Applied: {application.date_applied}
      </p>
      <p>
       Salary: {application.salary}
      </p>
      <p>
       Notes: {application.notes}
      </p>
    </div>
  )
}

export default DisplayCard