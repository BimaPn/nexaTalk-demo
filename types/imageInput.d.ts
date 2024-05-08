interface MediaInputBased {
  value: Media[],
  onChange : (images: Media[]) => void,
}

interface MediaInputContext extends MediaInputBased {
  removeMedia : (index:number) => void, 
} 

interface MediaInput extends MediaInputBased {
  children : React.ReactNode,
  className ?: string
}
type Media = {
  type: string
  src: string
}
