import type { StructureBuilder, StructureResolverContext, DefaultDocumentNodeResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { Iframe } from "sanity-plugin-iframe-pane";
import { SanityDocument } from "@sanity/client";
import { LuHome, LuLock, LuGamepad2 } from "react-icons/lu";
import { IoShareSocialOutline } from "react-icons/io5";
import type { IconType } from "react-icons";

export const singletons = new Set([`home`, `privacy`, `social`]);
export const singletonActions = new Set([`publish`, `discardChanges`, `restore`]);
export const hasPreview = new Set([`home`, `privacy`, `game`, `post`]);

const iframeOptions = {
  showDisplayUrl: false,
  reload: {
    button: true,
  },
  loader: true,
};

const singleListItem = (S: StructureBuilder, title: string, name: string, icon: IconType) => {
  return S.listItem()
  .title(title)
  .id(name)
  .child(
    S.document()
    .schemaType(name)
    .documentId(name)
    .views([
      S.view.form(),
      S.view.component(Iframe).options({
        url: `${process.env.SANITY_STUDIO_SITE_URL}/api/preview?name=${name}`,
        ...iframeOptions
      })
      .title(`Preview`)
    ])
  ).icon(icon);
};

export const deskConfig = (S: StructureBuilder, context: StructureResolverContext) =>
  S.list()
    .title(`Content`)
    .items([
      singleListItem(S, `Home Page`, `home`, LuHome),
      singleListItem(S, `Privacy Policy`, `privacy`, LuLock),
      S.divider(),
      orderableDocumentListDeskItem({
        type: `game`,
        title: `Games & Projects`,
        icon: LuGamepad2,
        S,
        context,
      }),
      ...S.documentTypeListItems().filter((item) => item && !singletons.has(item.getId() as string)).filter((item) => item.getId() !== `media.tag`).filter((item) => item.getId() !== `game`),
      S.divider(),
      singleListItem(S, `Social Media Accounts`, `social`, IoShareSocialOutline),
    ]);

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  if (hasPreview.has(schemaType)) {
    return S.document()
    .views([
      S.view.form(),
      S.view
      .component(Iframe)
      .options({
        url: (doc: SanityDocument) => `${process.env.SANITY_STUDIO_SITE_URL}/api/preview?sector=${doc?.sector}&slug=${doc?.slug?.current}`,
        ...iframeOptions,
      })
      .title(`Preview`)
    ]);
  }
  return S.document().views([S.view.form()]);
};
