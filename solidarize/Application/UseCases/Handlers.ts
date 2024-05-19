export default abstract class Handler<T> {
    protected sucessor?: Handler<T>;

    public SetSucessor(sucessor: Handler<T>): this {
        this.sucessor = sucessor;
        return this;
    }

    public abstract ProcessRequest(request: T): Promise<void>
}
