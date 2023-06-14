import { User } from 'lucide-react'

export default function ProfileRedirect() {
  return (
    <div>
      <a
        href={`https://cdn.faceit.com/widgets/sso/index.html?response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_popup=true`}
        className="text-zinc-100 flex items-center gap-3 px-4 pt-5 text-left transition-colors "
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-400 ">
          <User className="h-12 w-12 text-gray-500 " />
        </div>
        <p className=" max-w-[120px] text-lg  leading-snug">
          <span className="underline">Faca login</span> usando a Faceit para ter
          acesso a esta pagina
        </p>
      </a>
    </div>
  )
}
