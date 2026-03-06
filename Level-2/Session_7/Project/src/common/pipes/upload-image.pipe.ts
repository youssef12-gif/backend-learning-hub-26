import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export class ImagePipe extends ParseFilePipe {
  constructor(fileIsRequired = false) {
    super({
      fileIsRequired,
      validators: [
        new FileTypeValidator({
          skipMagicNumbersValidation: false,
          fileType: /^image\/(png|jpg|webm)$/,
          errorMessage: 'file must be an image',
        }),
        new MaxFileSizeValidator({
          maxSize: 5 * 1024 * 1024,
          errorMessage: 'image size must be less than 5 mb',
        }),
      ],
    });
  }
}
