import { ItemsHandlerContext, ItemsHandlerParams } from '..'

export interface ItemHandlerContext extends ItemsHandlerContext {}
export interface ItemHandlerParams extends ItemsHandlerParams {
	id: string
}
