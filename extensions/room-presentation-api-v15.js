// A customer bundle contains rendered scene data and public summaries, not the editor or raw LDT library.
async function capturePresentation(includeResults=true){
 if(!$('lxRoomForm').checkValidity())throw new Error('Correct the room/furniture/plane settings before preparing the presentation.');
 const wasActive=active,wasOpen=dialog.open,before=scenarioView(),pending=importedView;
 try{
  if(!active||viewerContext!=='room')open(true);if(!active||!renderer)throw new Error('3D is unavailable. Disable Include room to prepare a 2D proposal.');
  clearTimeout(rebuildTimer);rebuildTimer=0;viewerContext='room';roomOn=true;exploded=false;luxOn=!!includeResults;ugrOn=!!includeResults;rebuild();$('lxFitRoom').click();
  let analysis=null;if(includeResults)analysis=await analyzeScenario();
  const frame=()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))),shot=async()=>{await frame();resize();renderer.render(scene,camera);return renderer.domElement.toDataURL('image/jpeg',.9);};
  $('lxFitRoom').click();const savedMap=illumination.visible;illumination.visible=false;const roomImage=analysis?.roomImage||await shot();illumination.visible=savedMap;
  const view=scenarioView(),originalGeometries=[],converted=new Map();let sceneData;try{scene.traverse(o=>{if(o.geometry){const original=o.geometry;let geometry=converted.get(original.uuid);if(!geometry){geometry=new THREE.BufferGeometry().copy(original);geometry.uuid=original.uuid;converted.set(original.uuid,geometry);}originalGeometries.push([o,original]);o.geometry=geometry;}});sceneData=scene.toJSON();}finally{for(const [object,geometry]of originalGeometries)object.geometry=geometry;for(const geometry of converted.values())geometry.dispose();}const groupIds={model:model.uuid,room:room.uuid,map:illumination.uuid,observer:ugrGroup.uuid,plane:planeVisual.uuid};
  const vis=[room.visible,illumination.visible,ugrGroup.visible,planeVisual.visible];room.visible=illumination.visible=ugrGroup.visible=planeVisual.visible=false;roomOn=false;viewerContext='model';model.traverse(o=>{if(o.userData.installationOnly)o.visible=false;});preset('home');const modelImage=await shot();model.traverse(o=>{if(o.userData.installationOnly)o.visible=true;});[room.visible,illumination.visible,ugrGroup.visible,planeVisual.visible]=vis;viewerContext='room';roomOn=true;
  const controls=Object.fromEntries(scenarioControlIds.map(id=>[id,$(id).value]));
  const publicAnalysis=analysis?{createdAt:analysis.createdAt,outputPercent:analysis.outputPercent,ratedLm:analysis.ratedLm,effectiveLm:analysis.effectiveLm,ratedW:analysis.ratedW,mapped:analysis.mapped,total:analysis.total,lux:analysis.lux,surfaces:analysis.surfaces,ugr:analysis.ugr,ugrUnavailable:analysis.ugrUnavailable,warnings:analysis.warnings,ldt:analysis.ldt,luminaireHeights:analysis.luminaireHeights}:null;
  return {scene:sceneData,groups:groupIds,camera:view.camera,roomImage,modelImage,mapImage:analysis?.mapImage||null,room:{controls,furniture:jsonCopy(furniturePresets[$('lxFurniture').value]||null),plane:jsonCopy(planeConfig)},analysis:publicAnalysis};
 }finally{importedView=pending;if(wasActive)applyScenarioView(before);else{if(dialog.open&&!wasOpen)dialog.close();active=false;viewerContext=before.context;mode=before.mode;dark=before.dark;exploded=before.exploded;luxOn=before.luxOn;ugrOn=before.ugrOn;}syncAnalysisUI();syncUgrUI();}
}
