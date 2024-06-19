export default class ApiBadResponse{
    public Status!: Number;
    public Response!: string[]; 

	constructor(status:Number, response: string[]) {
        this.Status=status;
        this.Response = response;
	}


}