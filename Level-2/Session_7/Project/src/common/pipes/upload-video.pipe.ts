import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export class VideoPipe extends ParseFilePipe {
  constructor(fileIsRequired = false) {
    super({
      fileIsRequired,
      validators: [
        new FileTypeValidator({
          skipMagicNumbersValidation: false,
          fileType: /^video\/(mp4|webm)$/,
          errorMessage: 'file must be a video',
        }),
        new MaxFileSizeValidator({
          maxSize: 2 * 1024 * 1024 * 1024,
          errorMessage: 'video size must be less than 2 GB',
        }),
      ],
    });
  }
}
