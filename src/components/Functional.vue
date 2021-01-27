<script>
import { h } from "vue";
function Heading(props, context) {
  console.log(context);
  return h(`h${props.level}`, context.attrs, context.slots);
}

Heading.props = ["level"];

export default Heading;
</script>