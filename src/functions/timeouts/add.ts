import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";
import { Utils } from "../../classes/utils";
import lodash from "lodash";
// import Hjson from "hjson";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("addTimeout")
        .setValue("description", "Add a new timeout")
        .setValue("use", "$addTimeout[time;id;data;code]")
        .setValue("fields", [{
            name: "time",
            type: "time"
        }, {
            name: "id",
            type: "string | \"random\""
        }, {
            name: "code",
            type: "string<interpretableCode>"
        }])
        .setValue("example", "$addTimeout[5s;asdf;$log[TIMEOUT;hi!]]")
        .setValue("returns", "Void"),
    code: async function () {
        await this.resolveFields()
        let [time, id, data] = this.fields.split(true) as [number, string, Record<string, any> | null]
        data = Utils.Object(data as any) || data
        await this.fields.unsolve()
        time = Utils.TimeToMS(time as unknown as string)
        id == "random" && (id = lodash.random(Number.MAX_SAFE_INTEGER).toString())
        await this.data.client.timeouts.add(time, id, { code: this.fields.get(3, "").unescape(), data })
        return this.makeReturn(id)
    }
}