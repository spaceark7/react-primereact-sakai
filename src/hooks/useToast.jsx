const useToast = () => {

  /**
   * Show a toast notification
   * @param {GlobalToastProps}  - The toast notification properties
   * @property {ToastSeverity} severity - The severity of the toast (success, info, warn, error)
   * @property {string} summary - The summary of the toast
   * @property {string} detail - The detail message of the toast
   * @returns {void}
   */
  const show = ({ severity, summary, detail }) => {
    throw new Error('Show toast not implemented')
  }

  const clear = () => {
    throw new Error('Clear toast not implemented')
  }

  return {
    isOpen: false,
    severity: undefined,
    summary: '',
    detail: '',
    show,
    clear,
  }
}

export default useToast
