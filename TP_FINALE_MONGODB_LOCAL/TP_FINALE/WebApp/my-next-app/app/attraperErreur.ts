export function retournerErreur(error:any,defaut:string) {

    if(error instanceof Error) {
        return error.message;
    }

    return defaut;
}