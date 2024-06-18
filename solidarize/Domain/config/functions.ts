import { setLoginResponse } from '@/Provider/Slices/LoginSlice';
import { AppDispatch } from '@/Provider/Store';
import { NextRouter } from 'next/router';
import { Dispatch } from 'react';


export function RegionGeographyLimit(latitude:number, longitude:number):boolean{
    const limiteNorte = 5;
    const limiteSul = -34;
    const limiteLeste = -34;
    const limiteOeste = -74;
  
    return (
      latitude <= limiteNorte &&
      latitude >= limiteSul &&
      longitude >= limiteLeste &&
      longitude <= limiteOeste
    );
  }

  export async function getImageBase64FromUrl(imageUrl: string): Promise<string> {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise<string>((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      });
    } catch (error) {
      console.error('Erro ao obter a imagem:', error);
      return ''; 
    }
  }

export function compareArrays<T>(array1: T[], array2: T[]): boolean {
  return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
}
  
export function TruncateText( text:string, maxLength:number ) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

export function Sair(Dispatch: AppDispatch, router: NextRouter){
  Dispatch(
    setLoginResponse({
      Token: undefined,
      UserInformation: undefined,
    })
  );
  router.push("/Login");
}

export function brtFormatter(dateString:string) {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo'
  });
  return formatter.format(date);
}