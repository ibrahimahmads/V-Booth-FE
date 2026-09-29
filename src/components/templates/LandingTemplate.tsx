import Badge from "../atoms/Badge";

export default function LandingTemplate() {
  return (
    <div className="min-h-screen flex justify-center items-center">
        <div className="bg-primary p-3 border-2 rounded-2xl items-center flex flex-col gap-2">
            <Badge>Mohon Maaf</Badge>
            <Badge>Untuk Saat ini website sedang dalam pengembangan</Badge>
            <Badge>Nantikan ketika website sudah selesai</Badge>
        </div>
    </div>
  )
}
