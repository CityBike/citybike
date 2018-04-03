function createAnims(scene) {

  manWalkingFrames = scene.anims.generateFrameNames('businessMan', {
    start: 1, end: 7, zeroPad: 2, prefix: 'business_guy_', suffix: '.gif'
  })

  manSmackedFrames = scene.anims.generateFrameNames('businessMan', {
    start: 42, end: 46, zeroPad: 2, prefix: 'business_guy_', suffix: '.gif'
  })

  allFrames = scene.anims.generateFrameNames('bikergirl', {
    start: 3, end: 59, zeroPad: 2, prefix: 'bikergirl_', suffix: '.gif'
  })

  defaultBikingFrames = scene.anims.generateFrameNames('bikergirl', {
    start: 11, end: 18, zeroPad: 2, prefix: 'bikergirl_', suffix: '.gif'
  })

  upFrames = scene.anims.generateFrameNames('bikergirl', {
    start: 3, end: 6, zeroPad: 2, prefix: 'bikergirl_', suffix: '.gif'
  })

  leftFrames = scene.anims.generateFrameNames('bikergirl', {
    start: 21, end: 24, zeroPad: 2, prefix: 'flipped_bikergirl_', suffix: '.gif'
  })

  rightDiagonalFrames = scene.anims.generateFrameNames('bikergirl', {
    start: 19, end: 22, zeroPad: 2, prefix: 'bikergirl_', suffix: '.gif'
  })

  crashFrames = scene.anims.generateFrameNames('bikergirl', {
    start: 32, end: 35, zeroPad: 2, prefix: 'bikergirl_', suffix: '.gif'
  })

  smackFrames = scene.anims.generateFrameNames('bikergirl', {
    start: 50, end: 54, zeroPad: 2, prefix: 'bikergirl_', suffix: '.gif'
  })

  victoryFrames = scene.anims.generateFrameNames('bikergirl', {
    start: 58, end: 59, zeroPad: 2, prefix: 'bikergirl_', suffix: '.gif'
  })

  scene.anims.create({
    key: 'right',
    frames: rightDiagonalFrames,
    frameRate: 10,
    repeat: -1
  })

  scene.anims.create({
    key: 'all',
    frames: allFrames,
    frameRate: 10,
    repeat: -1
  })


  scene.anims.create({
    key: 'crash',
    frames: crashFrames,
    frameRate: 5,
    repeat: 0
  })

  scene.anims.create({
    key: 'up',
    frames: upFrames,
    frameRate: 10,
    repeat: -1
  })

  scene.anims.create({
    key: 'left',
    frames: leftFrames,
    frameRate: 10,
    repeat: -1
  })

  scene.anims.create({
    key: 'walk',
    frames: manWalkingFrames,
    frameRate: 10,
    repeat: -1
  })

  scene.anims.create({
    key: 'smack',
    frames: manSmackedFrames,
    frameRate: 5,
    repeat: 0
  })

  scene.anims.create({
    key: 'victory',
    frames: victoryFrames,
    frameRate: 5,
    repeat: 0
  })


  scene.anims.create({
    key: 'default',
    frames: defaultBikingFrames,
    frameRate: 7,
    repeat: 0
  })

}
