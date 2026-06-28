$ports = @(5002,3002)
foreach ($port in $ports) {
    $conns = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    foreach ($c in $conns) {
        Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue
    }
}
Set-Location 'd:\sangi\Downloads\yathirai-mern\yathirai-mern'
npm run dev
