





export interface BaseModel<TDto>{
  findById(id: string): Promise<TDto | null>
  findByIds(id: string[]): Promise<TDto[] | null>
  exist(id: string): Promise<boolean>
  removeById(id: string): Promise<TDto | null>
  removeByIds(id: string[]): Promise<TDto[] | null>
  save(data: TDto): any
}