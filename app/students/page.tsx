import prisma from "@/app/lib/prisma";
import DeleteButton from "./delete-button";

export default async function StudentsPage() {
  const students = await prisma.student.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <main className="mx-auto max-w-6xl p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Student Management
        </h1>

        <p className="mt-2 text-gray-600">
          จำนวนนักศึกษา:{" "}
          <strong>{students.length}</strong> คน
        </p>

        {/* ปุ่มเพิ่มนักศึกษา */}
        <a
          href="/students/create"
          className="my-5 inline-block rounded bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-blue-700"
        >
          เพิ่มนักศึกษา
        </a>
      </div>

      {/* ตารางนักศึกษา */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 font-semibold">
                ID
              </th>

              <th className="px-4 py-3 font-semibold">
                รหัสนักศึกษา
              </th>

              <th className="px-4 py-3 font-semibold">
                ชื่อ
              </th>

              <th className="px-4 py-3 font-semibold">
                Email
              </th>

              <th className="px-4 py-3 font-semibold">
                สาขา
              </th>

              <th className="px-4 py-3 font-semibold">
                ชั้นปี
              </th>

              <th className="px-4 py-3 font-semibold">
                สถานะ
              </th>

              <th className="px-4 py-3 font-semibold">
                จัดการ
              </th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center text-gray-500"
                >
                  ยังไม่มีข้อมูลนักศึกษา
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr
                  key={student.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  {/* ID */}
                  <td className="px-4 py-3">
                    {student.id}
                  </td>

                  {/* รหัสนักศึกษา */}
                  <td className="px-4 py-3">
                    {student.studentCode}
                  </td>

                  {/* ชื่อ */}
                  <td className="px-4 py-3 font-medium">
                    {student.name}
                  </td>

                  {/* Email */}
                  <td className="px-4 py-3">
                    {student.email ?? "-"}
                  </td>

                  {/* สาขา */}
                  <td className="px-4 py-3">
                    {student.major}
                  </td>

                  {/* ชั้นปี */}
                  <td className="px-4 py-3">
                    {student.year}
                  </td>

                  {/* สถานะ */}
                  <td className="px-4 py-3">
                    {student.status ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        กำลังศึกษา
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        ไม่ใช้งาน
                      </span>
                    )}
                  </td>

                  {/* จัดการ */}
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {/* ปุ่มแก้ไข */}
                      <a
                        href={`/students/${student.id}/edit`}
                        className="rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-yellow-600"
                      >
                        แก้ไข
                      </a>

                      {/* ปุ่มลบ */}
                      <DeleteButton id={student.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}