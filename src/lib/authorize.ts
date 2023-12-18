export async function getSetting() {
  return await uni.getSetting();
}

export async function openSetting() {
  return await uni.openSetting();
}

export async function showModal({
  title = '温馨提示',
  content,
  confirmText = '去授权',
  cancelText = '拒绝',
}: {
  title?: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
}): Promise<UniNamespace.ShowModalRes> {
  try {
    return await uni.showModal({
      title,
      content,
      confirmText,
      cancelText,
    });
  } catch (e) {
    console.error('[showModal]', e);
    return { confirm: false, cancel: true };
  }
}

export async function showToast({ title, mask = true }: { title: string; mask?: boolean }) {
  return await uni.showToast({ title, mask });
}

export async function authorize({ scope, content }: { scope: keyof UniNamespace.AuthSetting; content: string }) {
  try {
    const setting = await getSetting();

    if (!setting.authSetting[scope]) {
      uni.authorize({
        scope,
        success: () => Promise.resolve(),
        fail: async () => {
          const result = await showModal({ content });
          if (result.confirm) {
            const data = await openSetting();
            if (data.authSetting[scope]) {
              return Promise.resolve();
            } else {
              await showToast({ title: '授权失败' });
              return Promise.reject(new Error('用户拒绝授权'));
            }
          } else {
            return Promise.reject(new Error('用户拒绝授权'));
          }
        },
      });
    } else {
      return Promise.resolve();
    }
  } catch (e) {
    console.error('[authorize]', e);
    return Promise.reject(e);
  }
}
