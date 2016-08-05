// HACK: The style mock uses 'identity-obj-proxy' however factory.css is
// enumerated so the classNames (currently just inline) need to actually exist.
// TODO: See if __mocks__ can be used even if the module is mapped.
export default {
    inline: 'inline'
}
