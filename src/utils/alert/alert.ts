import { toast } from 'sonner';

export function errorAlertWithTitle (title:string,msg:string){
    toast.warning(title,{description:msg})
}

export function successAlertWithTitle (title:string,msg:string){
    toast.success(title,{description:msg})
}

export function successAlert(msg:string){
    toast.success(msg)
}