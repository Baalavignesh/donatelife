import { ReachedUser, Location } from "../pages/bank_dashboard";

interface CardProps {
  reqNo: number;
  status: string;
  bloodType: string;
  urgency: string;
  location: Location;
  reachedUsers: ReachedUser[];
  createdAt: string;
}

export default function DonorCard({
  reqNo,
  status,
  bloodType,
  urgency,
  location,
  reachedUsers,
  createdAt,
}: CardProps) {
  const urgencyColor = urgency === "High" ? "bg-red-500" : "bg-yellow-400";
  const statusColor =
    status === "Fulfilled" ? "text-green-400" : "text-red-400";

  return (
    <div className="w-full max-w-sm bg-secondary text-custom-white p-6 rounded-xl shadow border border-secondary space-y-4">
      <div className="flex justify-between">
        <span className="text-base font-semibold">Req. No:</span>
        <span className="text-base font-medium">{reqNo}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-base font-semibold">Status:</span>
        <span className={`text-base font-bold ${statusColor}`}>{status}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-base font-semibold">Blood Type:</span>
        <span className="text-xl font-extrabold">{bloodType}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-base font-semibold">Urgency:</span>
        <span
          className={`px-4 py-1 text-base font-bold rounded-full ${urgencyColor} text-black`}
        >
          {urgency}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-base font-semibold">Reached Users:</span>
        <span className="text-base font-medium">{reachedUsers.length}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-base font-semibold">Created At:</span>
        <span className="text-base font-medium">
          {new Date(createdAt).toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
      </div>
    </div>
  );
}
