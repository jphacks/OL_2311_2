export type User = {
  id: string; // Firebase Authenticationのuid
  name?: string; // 名前
  profileImageUrl?: string; // 画像のurl
  location?: string; // 出身地
  techArea?: string; // 好き・得意な技術領域
  xId?: string; // SNS Xのid
  instagramId?: string; // SNSのInstagramのid
  homepageLink?: string; // ホームページのリンク
  deviceUuid?: string; // BluetoothデバイスのUUID
  bleUserId?: string; // Bluetoothデバイスに渡すユーザーID
  lastCheersUserId?: string; // 最後に乾杯したuserのid
  cheerUserIds?: string[]; // 過去に乾杯したことのあるuserのids
};
