import { toast } from 'sonner';

export async function errorAlert (title:string,description:string){
    toast.warning(title,{description:description})
}

export async function successAlert (title:string,description:string){
    toast.success(title,{description:description})
}