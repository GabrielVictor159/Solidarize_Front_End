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
  

  