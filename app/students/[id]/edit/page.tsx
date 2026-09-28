import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";

type EditStudentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function updateStudent(
  studentId: number,
  formData: FormData
) {
  "use server";

  const studentCode = formData.get("studentCode") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const major = formData.get("major") as string;
  const year = Number(formData.get("year"));

  await prisma.student.update({
    where: {
      id: studentId,
    },
    data: {
      studentCode,
      name,
      email: email || null,
      major,
      year,
    },
  });

  redirect("/students");
}

export default async function EditStudentPage({
  params,
}: EditStudentPageProps) {
  const { id } = await params;
  const studentId = Number(id);

  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
  });

  if (!student) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-red-600">
          ไม่พบข้อมูลนักศึกษา
        </h1>

        <a
          href="/students"
          className="mt-4 inline-block rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
        >
          กลับหน้ารายชื่อ
        </a>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          แก้ไขนักศึกษา
        </h1>

        <p className="mt-2 text-gray-600">
          แก้ไขข้อมูลนักศึกษา ID: {student.id}
        </p>
      </div>

      <form
        action={async (formData) => {
          "use server";
          await updateStudent(studentId, formData);
        }}
        className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        {/* รหัสนักศึกษา */}
        <div>
          <label
            htmlFor="studentCode"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            รหัสนักศึกษา
          </label>

          <input
            id="studentCode"
            name="studentCode"
            type="text"
            defaultValue={student.studentCode}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* ชื่อ */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            ชื่อ-นามสกุล
          </label>

          <input
            id="name"
            name="name"
            type="text"
            defaultValue={student.name}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            defaultValue={student.email ?? ""}
            className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* สาขา */}
        <div>
          <label
            htmlFor="major"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            สาขา
          </label>

          <input
            id="major"
            name="major"
            type="text"
            defaultValue={student.major}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* ชั้นปี */}
        <div>
          <label
            htmlFor="year"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            ชั้นปี
          </label>

          <input
            id="year"
            name="year"
            type="number"
            min="1"
            max="8"
            defaultValue={student.year}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* ปุ่ม */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
          >
            บันทึกการแก้ไข
          </button>

          <a
            href="/students"
            className="rounded-md bg-gray-500 px-5 py-2.5 font-medium text-white hover:bg-gray-600"
          >
            ยกเลิก
          </a>
        </div>
      </form>
    </main>
  );
}