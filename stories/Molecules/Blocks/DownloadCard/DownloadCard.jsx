import React from 'react';
import './DownloadCard.scss';
import '../../../assets/scss/_grid.scss';
import { Publicationthumb } from '../../../Atom/Cards/Publication-thumbnail/PublicationThumbnail';
import { Cardthumb } from '../../../Atom/Cards/Card-thumbnail/CardThumbnail';
import { Icondownload } from '../../../Atom/Icons/download';

export const DownloadCard = ({
  image, image2, title, format, download,
}) => (
  <div className="download-card">
    {image && <Publicationthumb />}
    {image2 && <Cardthumb />}
    <div className="download-card__description">
      <p className="download-card__title">{title}</p>
      <p className="download-card__format">{format}</p>
      <a href="#" className="download-card__download">
        {download}
      </a>
    </div>
  </div>
);
