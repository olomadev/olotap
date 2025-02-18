import { getMarkRange } from '@tiptap/core'
import { Link as TiptapLink } from '@tiptap/extension-link'
import { Plugin, TextSelection } from '@tiptap/pm/state'
import LinkDialog from '../link/LinkDialog.vue'
import LinkActionButton from '../LinkActionButton.vue'
import { useContext } from "../hooks/use-context";
/**
 * Custom Link extension for Tiptap, extending the Tiptap Link functionality
 * with a dialog for editing links and a custom action button.
 */
export const Link = TiptapLink.extend({
  // Add options to override default link behavior
  addOptions() {
    const { state } = useContext();
    return {
      ...this.parent?.(),
      openOnClick: false,  // By default, links won't open on click
      dialogComponent: () => LinkDialog,  // Link dialog component
      button: ({ editor, extension }) => {
        const { dialogComponent } = extension.options

        return {
          component: LinkActionButton,  // Custom action button
          componentProps: {
            isActive: () => editor.isActive('link') || false,  // Check if the link is active
            disabled: !editor.can().setLink({ href: '' }),  // Disable if the link can't be set
            icon: "mdi-link-variant-plus",  // Icon for the button
            tooltip: state.t('editor.link.tooltip')  // Tooltip text for the button
          },
          componentSlots: {
            dialog: dialogComponent()  // Insert the dialog component into the button
          }
        }
      }
    }
  },
})
export default Link;
