// pages/api/comprimir-imagem.js
import axios from 'axios';
import sharp from 'sharp';

export default async function handler(req:any, res:any) {
  const { url } = req.query;

  try {
    // Obter a imagem como um array buffer
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const bufferImagem = Buffer.from(response.data);

    // Comprimir a imagem
    const imagemComprimida = await sharp(bufferImagem)
      .jpeg({ quality: 50 })
      .toBuffer();

    // Configurar cabeçalhos de resposta para imagem
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(imagemComprimida);
  } catch (error) {
    console.error('Erro ao obter ou comprimir a imagem:', error);
    res.status(500).send('Erro ao processar a imagem');
  }
}
