async function loadServer() {
    const serverModule = await import('../dist/tv-show-scores/server/server.mjs');
    return serverModule.app;
  }
  
  export default loadServer().then(app => app())