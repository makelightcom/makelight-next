import axios from 'axios'

export const cachedMakelightFetch = async (path, req) => {
  let error
  let json
  let res
  
  if(req && req.cache) {
    res = await req.cache.get(`makelight_${path}`)
  } 
  if(res) {
    json = res
  } else {
    res = await axios(`https://www.makelight.com/${path}.json`).catch((ex) => {
      error = ex
    })
    if(error) {
      return { error: error }
    } else {
      json = res.data      
    }
    if(req && req.cache) {
      await req.cache.set(`makelight_${path}`, json, Date.now() + 60000)
    }
  }
  return({json, error})
}