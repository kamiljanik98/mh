import UploadForm from "@/components/upload/upload-form";

export default function UploadPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-semibold">Upload a track</h1>
      <UploadForm />
    </main>
  );
}
