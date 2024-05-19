export default class ApiBadResponse{
    private Status!: Number;
    private Response!: string[]; 

	constructor(status:Number, response: string[]) {
        this.$Status=status;
        this.$Response = response;
	}
    
    /**
     * Getter $Status
     * @return {Number}
     */
	public get $Status(): Number {
		return this.Status;
	}

    /**
     * Getter $Response
     * @return {string}
     */
	public get $Response(): string[] {
		return this.Response;
	}

    /**
     * Setter $Status
     * @param {Number} value
     */
	public set $Status(value: Number) {
		this.Status = value;
	}

    /**
     * Setter $Response
     * @param {string} value
     */
	public set $Response(value: string[]) {
		this.Response = value;
	}

}