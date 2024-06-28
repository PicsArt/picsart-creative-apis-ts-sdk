# PICSART CREATIVE APIS

## Description

This is a TypeScript SDK of Picsart Programmable Image APIs and Picsart GenAI APIs. 
You can easily do many actions with your images just by adding few lines of code to your JavaScript or Typescript projects.

## Installation 

To install the package, run the following command:
```bash
npm install --save picsart-creative-apis-ts-sdk
```

## Usage 
#### _Get an API instance_
```typescript
import  PicsartEnterprise from "picsart-creative-apis-ts-sdk";

// Get an instance of image API
const imageApi = PicsartEnterprise.createImageApi('YOUR_API_KEY');

// Get an instance of GenAI API
const genaiApi = PicsartEnterprise.createGenAIApi('YOUR_API_KEY');
```

#### _Create an Image instance_
```typescript
// From public image url
const imageSource = ImageApi.fromUrl('https://....');

// From Picsart image id
const imageSource = ImageApi.fromImageId('your-image-id-here');

// From binary
const fileContent = fs.readFileSync("examples/image.png");
const imageSource = ImageApi.fromFile(fileContent);

// From stream
const readStream = fs.createReadStream("examples/image.png");
const imageSource = ImageApi.fromStream(readStream);
```

#### _Remove background_
```typescript
  const result = await imageApi.removeBackground(
      new RemoveBackgroundRequest()
        .setImage(imageSource)
        .setBgColor("green")
    );

  console.log(result.image.url);
  console.log(result.metadata.creditsAvailable);
  console.log(result.metadata.rateLimitResetTime);
  console.log(result.metadata.rateLimit);
  console.log(result.metadata.rateLimitAvailable);
  console.log(result.metadata.correlationId);
```

#### _Adjust image_
```typescript
  const result = await imageApi.adjust(
      new AdjustRequest()
        .setImage(imageSource)
        .setBrightness(90)
        .setSharpen(40)
    );
    
  console.log(result.image.url);
```

#### _Apply effects_
```typescript
  const result = await imageApi.effect(
      new EffectRequest()
        .setImage(imageSource)
        .setEffectName(EffectName.a1972)
    );

  console.log(result.image.url);
```

#### _Generate background textures_
```typescript
  const result = await imageApi.backgroundTexture(
      new BackgroundTextureRequest()
        .setImage(imageSource)
        .setPattern(TexturePattern.diamond)
        .setHeight(800)
    );

  console.log(result.image.url);
```

#### _Preview selected effects on an image_
```typescript
  const result = await imageApi.effectPreviews(
      new EffectPreviewsRequest()
        .setImage(imageSource)
        .addEffect(EffectName.a1972)
        .addEffect(EffectName.brnz2)
        .addEffect(EffectName.icy3)
        .addEffect(EffectName.apr3),
    );

  console.log(result.thumbnails);
```

#### _Enhance face_
```typescript
  const result = await imageApi
  .enhanceFace(
    new EnhanceFaceRequest()
      .setImage(imageSource),
  );

  console.log(result.image.url);
```

#### _Get balance_
```typescript
  const result = await imageApi.getBalance();
  console.log(result.credits);
```

#### _Get list of effects_
```typescript
  const result = await imageApi.getEffects();
  console.log(result.effects)
```

#### _Surface Map_
```typescript
  const result = await imageApi.surfacemap(
      new SurfacemapRequest()
        .setImage(imageSource1)
        .setMask(imageSource2)
        .setSticker(imageSource3)
    );

  console.log(result.image.url);
```

#### _Text to Image_
```typescript
  const result = await genaiApi.text2Image(
      new Text2ImageRequest()
        .setCount(10)
        .setPrompt("coding all the time")
        .setNegativePrompt("relax and rest")
    );
  console.log(result.images);
```


#### _Upload Image_
```typescript
  const fileContent = readFileSync("examples/image.png");
  const blob = new Blob([fileContent]);

  const imageSource = ImageApi.fromFile(blob);
  const result = await imageApi.upload(
    new UploadRequest()
      .setImage(imageSource)
  );

  console.log(result.image.url);
```

#### _Upscale_
```typescript
  const result = await imageApi.upscale(
    new UpscaleRequest()
      .setImage(imageSource)
      .setUpscaleFactor(UpscaleFactor.R2000x2000)
  );

  console.log(result.image.url);
```


#### _Ultra Enhance_
```typescript
  const result = await imageApi.ultraEnhance(
      new UltraEnhanceRequest()
        .setImage(imageSource)
        .setUpscaleFactor(6),
    );

  console.log(result.image.url);
```


#### _Ultra Upscale_
```typescript
  const result = await imageApi.ultraUpscale(
      new UltraUpscaleRequest()
        .setImage(imageSource)
        .setUpscaleFactor(4)
        .setMode(ProcessingMode.async),
    );

  console.log(result.image.url);
```

## _Build_
To build a package use the following command:
```bash
npm run build
```
It will create `/lib` directory in the root directory of the project which will contain ready to publish npm package.

## _Generating API References_
API references are generated using TypeDoc based on TSDoc comments in the code.
Run the following command to generate it:
```bash
npm run generate-docs
```
This command will generate API documentation in HTML format in `/docs` directory.

## _Tests_ 

To run tests, use the following command:
```bash 
npm test
```

# License

Picsart Creative APIs SDK is provided under the MIT license that can be found in the
[LICENSE](./LICENSE) file.
By using, distributing, or contributing to this project, you agree to
the terms and conditions of this license.

This project has some third-party dependencies, each of which may have independent licensing:

- [axios:^1.7.2](https://www.npmjs.com/package/axios), ([MIT](https://github.com/axios/axios/blob/HEAD/LICENSE)): Used as a http client
- [axios-retry:^4.3.0](https://www.npmjs.com/package/axios-retry), ([Apache License V2.0](https://github.com/softonic/axios-retry/blob/master/LICENSE)): Used as an extension for axios for handling retrying
- [form-data:^4.0.0](https://www.npmjs.com/package/form-data), ([MIT](https://github.com/form-data/form-data/blob/master/License)): Used for building multipart/form-data payloads
- [yup:^1.4.0](https://www.npmjs.com/package/yup), ([MIT](https://github.com/jquense/yup/blob/master/LICENSE.md)): Used for client side request validations

# How to contribute?

If you like Picsart Creative APIs SDK and would like to contribute to this open-source project, please check the [Contribution
guide](./CONTRIBUTING.md).
