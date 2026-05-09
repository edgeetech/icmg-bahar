# Achievement Kids

Vite + React + TypeScript ile hazirlanmis, pastel ve oyun hissi tasiyan cocuk odakli kazanım panosu prototipi.

## Ne var?

- Kimya satiri ilk sirada ve tarihi **1 Mayis 2026**
- Ilk cocuk ve ilk erkek karakter olan **Muhammed Emir**, Kimya kazanımını tamamlamis durumda
- Sonraki 9 kazanım **8 Mayis 2026** tarihinden baslayarak her cuma gelecek sekilde kilitli
- Ortak sahne uzerinde duran karakterler ve yumusak pastel oyun panosu
- Rive-first karakter mimarisi
- Muhammed Emir icin premium Rive-hazir kaynak SVG paket yapisi
- Rive dosyasi hazir olana kadar calisan illustration fallback renderer
- Vitest + Testing Library test altyapisi

## Kurulum ve komutlar

```bash
npm install
npm run dev
npm test
npm run build
```

## Veri duzenleme

Çocuklar:

```txt
src/data/children.ts
```

Kazanımlar:

```txt
src/data/achievements.ts
```

Kazanım durumları:

```ts
'earned' | 'locked' | 'missed'
```

UI tarafinda `missed` durumu negatif dil yerine bekleyen / henüz tamamlanmamis olarak sunulur. Simdilik veri kaynaklari elle duzenlenir; backend veya CMS yoktur.

## Rive dosyalari

Beklenen runtime `.riv` dosya konumu:

```txt
public/rive/muhammed-emir.riv
```

Muhammed Emir su anda veri modelinde bu yolu kullanir:

```txt
/rive/muhammed-emir.riv
```

Eger `.riv` dosyasi henüz mevcut degilse:

- `CharacterRenderer` yine Rive-first path'i kullanir
- `RiveCharacterRenderer` fallback illustration gosterir
- uygulama calismaya devam eder

## Rive-ready kaynak vector paketi

Muhammed Emir icin katmanli kaynak dosyalar burada tutulur:

```txt
design/rive-source/muhammed-emir/
```

Bu klasor, Rive Editor icine aktarilmak uzere:

- head
- hair
- face
- eyes
- eyebrows
- mouth
- torso
- arms
- legs
- shoes
- medal anchor
- sparkles

gibi katmanlari ayri dosyalar halinde barindirir.

## Rive dokumantasyonu

Rive state machine ve React mapping spesifikasyonu:

```txt
docs/rive-character-spec.md
```

Rive import / setup rehberi:

```txt
docs/rive-import-guide.md
```

## Karakter fallback assetleri

Fallback karakter assetleri `public/characters` altinda tutulur.

```txt
public/characters/
  boys/
  shared/
```

Muhammed Emir'in fallback mood assetleri:

```txt
public/characters/boys/muhammed-emir/
  neutral.svg
  happy.svg
  proud.svg
  excited.svg
```

Madalya ve efekt katmanlari `public/characters/shared` altindadir.

## Rive'a geçiş planı

Aktif render noktasi:

```txt
src/renderers/CharacterRenderer.tsx
```

Bugun `RiveCharacterRenderer` birincil renderer yoludur. `CharacterAvatar`, karakter icin semantik prop setini uretir; Rive asseti yoksa veya henüz hazir degilse fallback gosterimi kullanilir.

React tarafinda map edilen temel girdiler:

- `score: number`
- `completedCount: number`
- `totalCount: number`
- `mood: neutral | happy | proud | excited`
- `medal: none | bronze | silver | gold`
- `selected: boolean`
- `hasNewAchievement: boolean`

## Test yaklaşımı

Oncelik verilen alanlar:

- Tarihe göre kazanım açılma/kilitlenme kuralları
- Skor/madalya hesaplama
- Kimya satiri, haftalik cuma takvimi ve gelecekteki satirlarin kilitli gorunmesi
- Rive mapping ve renderer secim mantigi
- Fallback illustration asset davranisi
- UI'da tamamlanmis ve kilitli hucrelerin dogru render edilmesi
