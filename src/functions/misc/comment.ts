import { FunctionBuilder } from "../../classes/builder";
import { SourceFunction } from "../../../index";

export const data: SourceFunction = {
    data: new FunctionBuilder()
        .setName("c")
        .setValue("description", "add a comment on your code")
        .setValue("use", "$c[comment]")
        .setValue("fields", [{
            name: "comment",
            description: "the comment (this  will not be executed)",
            type: "string",
            optional: true
        }])
        .setValue("example", "$c[$break is a util function]")
        .setValue("returns", "Void"),
    code: async function () {
        /* wtf r u doing reviewing the code? here, the lyrics of Mind Over Time (stop read my code!)
           I will still be up by fall
           I'll still be up by fall either way
           Still be up by fall
           I'll be still to hear the call either way
           Street of thought
           In all your bones
           Hold your place and
           Save your throne
           Lie awake supine and golden
           Wait for grace
           It's time
           Mind over time
           Mind over time
           Sleight of fate
           And borrowed clothes
           Songs of places
           No one knows
           Draped in lace we all lean over
           To greet the great
           It's time
           Mind over time
           Mind over time
           Street of thought
           In all your bones
           Hold your place
           And save your throne
           Lie awake supine and golden
           Greet the great its time
           Mind over time
           Mind over time
           It's mind over time
           It's your mind over time */
        return this.makeReturn("")
    }
}