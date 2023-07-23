const sharp = require ("sharp");


exports.resizeUserPhoto = async (req,res,next) =>{
  try {
    if(!req.file) return next();
    req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`
    await sharp(req.file.buffer)
    .resize(500,500)
    .toFormat('jpeg')
    .jpeg({quality : 90})
    .toFile(`public/img/users/${req.file.filename}`)
    next();
  } catch (error) {
    console.log(error)
  }
}

exports.resizeGamePhotos = async (req,res,next) =>{
    try {
      if(!req.files.coverImage && !req.files.images) return next();
      req.body.coverImage = `game-${Date.now()}-cover.jpeg`
      await sharp(req.files.coverImage[0].buffer)
      .resize(500,900)
      .toFormat('jpeg')
      .jpeg({quality : 90})
      .toFile(`public/img/games/${req.body.coverImage}`)
      req.body.images = [];
      await Promise.all(req.files.images.map(async(file,index)=>{
        const filename = `game-${Date.now()}-${index+1}.jpeg`
        await sharp(file.buffer)
        .resize(1920,1080)
      .toFormat('jpeg')
      .jpeg({quality : 90})
      .toFile(`public/img/games/${filename}`)
      req.body.images.push(filename)
      })); 
      next();
    } catch (error) {
      console.log(error)
    }
  }



  exports.resizeUpdatePhotosGame = async (req, res, next) => {
    try {
      if (!req.files || (!req.files.coverImage && !req.files.images)) {
        return next();
      }
  
      if (req.files.coverImage) {
        const coverImage = req.files.coverImage[0];
        const coverImageFilename = `game-${Date.now()}-cover.jpeg`;
        await sharp(coverImage.buffer)
          .resize(500, 900)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/img/games/${coverImageFilename}`);
        req.filteredBody = { ...req.filteredBody, coverImage: coverImageFilename };
      }
  
      if (req.files.images) {
        const images = Array.isArray(req.files.images)
          ? req.files.images
          : [req.files.images];
  
        const updatedImages = [];
  
        await Promise.all(
          images.map(async (image, index) => {
            const imageFilename = `game-${Date.now()}-${index + 1}.jpeg`;
            await sharp(image.buffer)
              .resize(1920, 1080)
              .toFormat("jpeg")
              .jpeg({ quality: 90 })
              .toFile(`public/img/games/${imageFilename}`);
            updatedImages.push(imageFilename);
          })
        );
  
        req.filteredBody = { ...req.filteredBody, images: updatedImages };
      }
  
      next();
    } catch (error) {

      next(error);
    }
  };

