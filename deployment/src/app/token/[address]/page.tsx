import TokenDexPage from '@/components/TokenDexPage'

interface TokenPageProps {
  params: Promise<{
    address: string
  }>
}

export default async function TokenPage({ params }: TokenPageProps) {
  const { address } = await params
  return <TokenDexPage tokenAddress={address} />
}
